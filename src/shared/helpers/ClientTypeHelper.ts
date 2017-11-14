
export class ClientTypeHelper {
    static isWeChatMiniProgram(): boolean {
        return (window.__wxjs_environment === 'miniprogram');
    }
}
