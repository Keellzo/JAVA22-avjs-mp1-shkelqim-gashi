class user {
   #username;
   #score;

    constructor(username, score) {
        this.#username = username;
        this.#score = score;
    }

    getUsername() {
        return this.#username;
    }

    getScore() {
        return this.#score;
    }

    setScore(score) {
        this.#score = score;
    }

    setUserName(username) {
        this.#username = username;
    }
}

export { user };