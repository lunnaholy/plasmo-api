enum BankScopes {
    MANAGE = "bank:manage",
    PENALTIES = "bank:penalties",
    BANKER = "bank:banker",
    BILL = "bank:bill",
    TRANSFER = "bank:transfer",
    BALANCE = "bank:balance",
    SEARCH = "bank:search",
    HISTORY = "bank:history",
    CARD_PENALTIES = "bank:penalties:card",
    CARD_BANKER = "bank:banker:card"
}

enum UserScopes {
    NOTIFICATIONS = "user:notifications"
}

const scopes = {
    bank: BankScopes,
    user: UserScopes
};

export default scopes;