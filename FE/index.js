// const clientIo = io("http://localhost:5000");
const clientIo = io("http://localhost:5000", {
  auth: {
    authorization: `user ${localStorage.getItem("authorization")}`
  }
});
// const clientIoAdmin = io("http://localhost:5000/admin");
// clientIoAdmin.emit("hi", "hello from client", (data) => {
//   console.log(data);
// });
// clientIo.emit("hi", "hello from client");
clientIo.emit("hi", { id: localStorage.getItem("socketId") });
clientIo.on("connect_error", (error) => {
  console.log(error);
});
