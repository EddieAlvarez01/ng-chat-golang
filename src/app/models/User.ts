export class User{
    constructor(
        public id: number,
        public role_id: number,
        public role: Object,
        public username: string,
        public password: string,
        public created_at: string
    ){}
}