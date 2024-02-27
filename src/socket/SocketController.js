class SocketController {
  #io;
  constructor(io) {
    this.#io = io;
  }
}

module.exports = SocketController;
