
// buyTemplate.ts
type PurchaseType = 'eco' | 'force' | 'fullbuy' | 'halfbuy' | 'own';

interface Templates {
    [key: string]: any | null;
}

class KaufVorlagen {
    private templates: Templates;

    constructor() {
        this.templates = {
            eco: null,
            force: null,
            fullbuy: null,
            halfbuy: null,
            own: null
        };
    }

    setVorlage(typ: PurchaseType, vorlage: any): void {
        if (Object.keys(this.templates).includes(typ)) {
            this.templates[typ] = vorlage;
        } else {
            console.error("Invalid purchase type");
        }
    }

    getVorlage(typ: PurchaseType): any | null {
        return this.templates[typ];
    }

    listVorlagen(): Templates {
        return this.templates;
    }
}

export default KaufVorlagen;
