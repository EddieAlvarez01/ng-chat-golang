export class Message{
    constructor(
        public id: number,
        public receiver: number,
        public sender: number,
        public message: string,
        public active: number,
        public created_at: string,
        public receiver_user: Object,
        public sender_user: Object,
        public sokcetIdSender: string
    ){}
}