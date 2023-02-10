import { useState } from "react";
import { Services } from "../Services";
import { LoadHTMLTemplate } from "./LoadHTMLTemplate";
import { Template } from "./Template";

enum Tabs {
    Basic = "Basic",
    HTML = "HTML",
}

const TabMap = {
    [Tabs.Basic]: <Template />,
    [Tabs.HTML]: <LoadHTMLTemplate />,
}

function Tab({
    currentTab,
    targetTab,
    setTab,
}: {
    currentTab: Tabs;
    targetTab: Tabs;
    setTab: (tab: Tabs) => void;
}) {
    return (
        <li className="nav-item">
            <button
                className={`nav-link ${currentTab === targetTab ? "active" : ""}`}
                onClick={() => {setTab(targetTab)}}
            >{targetTab}</button>
        </li>
    );
}

export function TemplateTabs() {
    const [tab, setTab] = useState(Tabs.Basic);

    const updateTab = (tab: Tabs) => {
        setTab(tab);
        if (tab === Tabs.HTML) {
            Services.TemplateProcessor.isHTML = true;
        } else {
            Services.TemplateProcessor.isHTML = false;
        }
    };

    return (
        <div>
            <ul className="nav nav-tabs">
                <Tab currentTab={tab} targetTab={Tabs.Basic} setTab={updateTab} />
                <Tab currentTab={tab} targetTab={Tabs.HTML} setTab={updateTab} />
            </ul>
            {TabMap[tab]}
        </div>
    );
}