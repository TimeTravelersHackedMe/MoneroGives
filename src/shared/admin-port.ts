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
}