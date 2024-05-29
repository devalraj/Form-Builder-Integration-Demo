import { env } from './env';

abstract class BaseConfig {
    isValid = false;
    validation_messages: string[] = [];

    require(name: string, value: unknown): void {
        if (!value) {
            this.validation_messages.push(`required setting '${name}' has no value`);
        }
    }

    validate(): void {
        this.validation_messages = [];
        this.validate_fields();
        this.isValid = this.validation_messages.length === 0;
    }

    protected abstract validate_fields(): void;
}


//=============================================
// private variables
//=============================================

const createConfig = () => {
    const config = new Config();
    config.form_builder_url = env.VITE_FORM_BUILDER;
    config.default_project_path = env.VITE_PROJECT_PATH;
    config.validate();
    return config;
};

//=============================================
// Config class
//=============================================

class Config extends BaseConfig {
    form_builder_url = ""
    default_project_path = ""

    override validate_fields(): void {
        // validate formio fields
        this.require('form_builder_url', this.form_builder_url);
        this.require('default_project_path', this.default_project_path);
    }
}

//=============================================
// main
//=============================================

const config = createConfig() as Readonly<Config>;

export default config;
