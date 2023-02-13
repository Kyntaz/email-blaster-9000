import "zx/globals";
import { createInterface } from "readline/promises";
import { Browser, BrowserContext, chromium, Page } from "playwright";
import { GlobalDestroyer } from "../Destroyer";

const Readline = createInterface({
    input: process.stdin,
    output: process.stdout,
});
GlobalDestroyer.defer(() => Readline.close());

async function getArg(argn: string): Promise<string> {
    return argv[argn] ?? await Readline.question(chalk.blue(`${argn}: `));
}

async function createPlaywrightContext(): Promise< {browser: Browser; context: BrowserContext; page: Page }> {
    console.log("Creating playwright context");

    const browser = await chromium.launch({
        headless: false,
        args: [
            "--lang=en-US",
        ],
    });
    const context = await browser.newContext({
        locale: "en-US",
    });
    GlobalDestroyer.defer(() => context.close());
    const page = await context.newPage();
    GlobalDestroyer.defer(() => page.close());

    return {
        browser,
        context,
        page,
    };
}

async function randomWait(min: number, rand: number, page: Page): Promise<void> {
    console.log("Waiting for a random amount of time");
    await page.waitForTimeout(min + rand * Math.random());
}

async function gmailLogin(page: Page): Promise<void> {
    console.log("Logging in into Gmail");
    const gmailUsername = await getArg("gmail-username");
    const gmailPassword = await getArg("gmail-password");

    await page.goto("https://mail.google.com");
    await page.locator(`[type="email"]`).fill(gmailUsername);
    await page.locator("text=Next").click();
    await page.locator(`[type="password"]`).fill(gmailPassword);
    await page.locator("text=Next").click();
    await page.waitForURL("https://mail.google.com/**");
}

async function uploadFile(placeholder: string, file: string, page: Page): Promise<void> {
    console.log(`Uploading ${file}`);
    const fcPromise = page.waitForEvent("filechooser");
    await page.locator(`[placeholder="${placeholder}"]`).click();
    const fileChooser = await fcPromise;
    await fileChooser.setFiles(file);
}

async function startSending(page: Page): Promise<void> {
    console.log("Preparing to send emails");
    const port = argv["port"] ?? "5173";
    const templateFile = await getArg("template-file");
    const excelFile = await getArg("excel-file");
    const subject = await getArg("subject");

    await page.goto(`http://localhost:${port}/email-blaster-9000`);
    await page.locator(`text="HTML"`).click();
    await page.locator(`[placeholder="Subject"]`).fill(subject);

    await uploadFile("Load file with HTML template", templateFile, page);
    await uploadFile("Load file with values", excelFile, page);

    await page.locator("text=Send Emails").click();
}

async function triggerVisibilityChange(page: Page): Promise<void> {
    console.log("Triggering a visibility change on the main page");
    await page.evaluate(() => {
        document.dispatchEvent(new Event("visibilitychange"));
    });
    await page.waitForTimeout(2000);
}

async function tryCopyEmailBody(context: BrowserContext): Promise<boolean> {
    console.log("Trying to copy the generated email body");
    const [page] = context.pages().filter((p) => p.url() === "about:blank");
    if (!page) {
        return false;
    }

    await page.keyboard.press("Control+A");
    await page.keyboard.press("Control+C");
    await page.close();
    return true;
}

async function tryToSendEmail(page: Page, url: string): Promise<boolean> {
    console.log("Sending email");
    try {
        await page.locator(".editable").focus({ timeout: 120_000 });
        await page.keyboard.press("Control+A");
        await page.keyboard.press("Control+V");
        
        await page.locator(`text="Send"`).click();

        await page.waitForSelector("text=Message sent");
        await page.close();
        return true;
    } catch (e) {
        console.error(chalk.red("Couldn't send email:"), e);
        await randomWait(30_000, 300_000, page);

        console.log(chalk.yellow("Reloading a new tab just in case"));
        page.goto(url);

        return false;
    }
}

async function buildEmail(context: BrowserContext): Promise<void> {
    console.log("Building email");
    const [badPage] = context.pages().filter((p) => p.url().includes("mail.google.com"));
    const url = badPage.url();
    await badPage.close();

    const page = await context.newPage();
    await page.goto(url);

    if (!page) {
        throw new Error("Couldn't find email composer");
    }

    while (!(await tryToSendEmail(page, url))) {
        console.log(chalk.yellow("Retrying"));
    }
}

async function main(): Promise<void> {
    console.log("Starting script execution");

    const { context, page } = await createPlaywrightContext();

    await gmailLogin(page);
    await startSending(page);
    while (true) {
        randomWait(5_000, 20_000, page);
        const copied = await tryCopyEmailBody(context);
        if (!copied) {
            break;
        }

        await triggerVisibilityChange(page);
        await buildEmail(context);
        await triggerVisibilityChange(page);
    }
    
    await GlobalDestroyer.destroy();

    console.log(chalk.green("Script run complete!"));
    process.exit();
}

main();
