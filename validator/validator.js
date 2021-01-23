export class Validator{
    static maxLength(length) {
        return value => {
            return value.length >= length && value.trim().length >= length
        }
    }

    static required(value) {
        return value && value.trim()
    }

    static default(value) {
        return value || true
    }

    static select(value) {
        return value !== 'default' 
    }
}