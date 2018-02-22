export class AdminPortSetting {
    public desc: string;
    public diff: number;
    public hidden: boolean;
    public port: number;
    public portType: string;
    public ssl: number;

    constructor(private data) {
        this.desc = this.data.desc;
        this.diff = this.data.diff;
        this.hidden = this.data.hidden;
        this.port = this.data.port;
        this.portType = this.data.portType;
        this.ssl = this.data.ssl;
    }

    get portData() {
        return {
            desc: this.desc,
            diff: this.diff,
            hidden: this.hidden ? 1 : 0,
            port: this.port,
            portType: this.portType,
            ssl: this.ssl ? 1 : 0
        }
    }
}