"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListUI = void 0;
async function ListUI({ data, title, name, page, prompt, footer = 0 }) {
    return JSON.stringify({
        app: "com.tencent.miniapp",
        desc: "",
        view: "notification",
        ver: "1.0.0.11",
        prompt,
        appID: "",
        sourceName: "",
        actionData: "",
        actionData_A: "",
        sourceUrl: "",
        meta: {
            notification: {
                appInfo: {
                    appName: name,
                    appType: 4,
                    appid: 1109659848
                },
                button: [],
                data: [
                    ...data,
                    {
                        title: ` `,
                        value: `${page[0]} / ${page[1]}${footer === 0 ? "" : ` | ${footer}`}`
                    }
                ],
                emphasis_keyword: "",
                title
            }
        }
    });
}
exports.ListUI = ListUI;
//# sourceMappingURL=embed.js.map