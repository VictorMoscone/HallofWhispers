//import React, { useState, useEffect } from "react";
import Card from "../Components/Card/Card";
import Col from "../Components/Col/Col";
import Container from "../Components/Container/Container";
import Row from "../Components/Row/Row";
import StatCard from "../Components/StatCard/StatCard";
import Wrapper from "../Components/Wrapper/Wrapper";
import { PostList, PostListItem } from "../Components/PostList/PostList";
import "./Home.css";
import axios from "axios";
// --- For authentication, allows you to stay logged in --- //
import { useHistory } from "react-router-dom";
import AccountContext from "../Context/AccountContext";
import React, { useState, useEffect, useContext, useRef } from "react";
import Dice from "react-dice-roll";
import socketIOClient from "socket.io-client";
import background from "../assets/images/vintage-concrete.png";
const moment = require("moment");

const Home = () => {
  // Setting initial state for posts
  const [posts, setPosts] = useState([]);
  const [postMessage, setPostMessage] = useState("");
  // Setting inital state for chat messages
  const [welcome, setWelcome] = useState("");
  const [messages, setMessages] = useState("");
  const [arr, setArr] = useState([]);
  const [id, setId] = useState("");
  const history = useHistory();
  const { userData } = useContext(AccountContext);


  // handles the input change for posting a message to the postboard
  const handleInputChange = (e) => {
    const { value } = e.target;
    setPostMessage(value);
  };

  // sumbits the post
  const handleSubmit = (e) => {
    // prevents page from refreshing
    e.preventDefault();
    // get local token
    let token = localStorage.getItem("auth-token");

    axios
      .post(
        "/api/posts",
        { message: postMessage, chrName: userData.character?.chrName },
        { headers: { "x-auth-token": token } }
      )
      .then((res) => {
        // console.log(res);
        const data = res.data;
        const arr = [...posts]
        arr.unshift(data)
        setPosts(arr)


        // console.log(data);
        // setPosts([...posts, data]);
      });

    // clears the input field after submitting
    setPostMessage("");
    // const { data } = await axios.post("/api/posts", { headers: { "x-auth-token": token }, message: postMessage });
    // console.log(data);
  };

  // loads all the posts
  useEffect(() => {
    loadPosts();
  }, []);

  // grabbing all the posts from the database
  function loadPosts() {
    let token = localStorage.getItem("auth-token");
    axios
      .get("/api/posts", { headers: { "x-auth-token": token } })
      .then((res) => {
        // console.log(res.data);
        setPosts(res.data);
      });
  }

  // connects messages
  useEffect(() => {
    const socket = socketIOClient("http://localhost:5000", {
      transports: ["websocket"],
    });
    // connects every user
    socket.on("connect", () => {
      // console.log(socket.id);
      setId(socket.id);
    });
    // connects title and shows on screen
    socket.on("new", (data) => {
      // console.log(data)
      setWelcome(data.message);
    });
    socket.on("newUser", (data) => {
      // console.log(data);
    });
    socket.on("disconnect", () => {
      console.log("disconnected homie");
    });
    socket.on("message", (data) => {
      // console.log(data);
      setArr((arr) => [...arr, data]);
    });
  }, []);

  // sends a message
  const sendMessage = (e) => {
    e.preventDefault();
    const socket = socketIOClient("http://localhost:5000", {
      transports: ["websocket"],
    });
    socket.emit(
      "newMessage",
      {
        message: messages,
        id: id,
        displayName: userData.character.chrName,
        date: moment(Date.now()).format("h:mm a"),
      },
      (data) => {
        // alert(data)
      }
    );
    // clears input field
    setMessages("");
  };

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "auto", block: "end", inline: "nearest" });
    // console.log(messagesEndRef)

  };

  useEffect(() => {
    scrollToBottom();
    if (!userData.pending && !userData.account) history.push("/login");
    //if (!userData.account?.charCreated) history.push("/character");
    //checkLoggedIn();
  }, [userData.pending, userData.account, history]);

  //--------------------------------------------
  //Activate this block of code when appropriate
  //Function:  If the user is not logged in, will go
  //back to the login page.

  // const history = useHistory();

  // useEffect(() => {
  //   if (!userData.account) {
  //     history.push("/login");
  //   }
  // }, [userData.account, history])

  // console.log(userData.character?.length === 0);

  //--------------------------------------------
  return (
    <div className="page-container">
      <Wrapper>
        <div className="container container-container">
          <div className="container margin-top">
            <Row>
              <Col size="md-12">
                <h5 className="user-font">
                  {userData.character?.chrName}
                </h5>
                <div className="last">
                  <strong className="subheading">
                    {`The ${userData.character?.chrRace}`}
                  </strong>
                  <strong className="subheading">
                    {` ${userData.character?.chrClass}`}
                  </strong>
                </div>
              </Col>
            </Row>
            <Row>
              <Col size="md-4">
                <StatCard />
              </Col>
              <Col size="md-4">
                <Row>
                  <h4 className="margin-between-form">Adventure Postings</h4>
                  <form onSubmit={handleSubmit}>
                      <textarea onChange={handleInputChange} type="text" name="message" value={postMessage} className="form-control" placeholder="Post your adventures here!" aria-label="post-message" aria-describedby="button-addon2" id="myInput"/>
                      <button className="btn btn-success" type="submit" id="button-addon2">Post</button>
                  </form>
                </Row>
                <Row>
                  <Card>
                    <PostList>
                      {posts.map((post, index) => {
                        return (
                          <PostListItem
                            // style={{border: "0"}}
                            key={index}
                            date={post.date}
                            accountId={post.accountId}
                            chrName={post.chrName}
                            message={post.message}
                            myAccount={
                              post.accountId === userData.account?.id
                                ? "true"
                                : "false"
                            }
                          />
                        );
                      })}
                    </PostList>
                  </Card>
                </Row>
              </Col>
              <Col size="md-4">
                <div>
                  <h4 className="margin-between-form">Whispers in the Hall</h4>
                  <Card>
                    {/* <p className="text-center">Current Whispers in the Hall</p> */}
                    <div ref={messagesEndRef}>
                      {/* {console.log(arr)} */}
                      {arr.map((chat, index) => (
                        <div key={index}>
                          <p>{chat.message}</p>
                          <p style={{ float: "right" }} className="timestamp">
                            {" "}
                            {chat.displayName} sent at:{" "}
                            {moment(chat.date).format("h:mm a")}
                          </p>
                          <br />
                        </div>
                      ))}
                    </div>
                  </Card>
                  <div className="d-flex">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter your message here"
                      value={messages}
                      onChange={(e) => {
                        setMessages(e.target.value);
                      }}
                    />
                    <button
                      className="btn btn-primary"
                      onClick={(e) => sendMessage(e)}
                    >
                      send
                  </button>
                  </div>
                </div>
                <br />
                <Dice onRoll={(value) => console.log(value)} size={50} />
              </Col>
            </Row>
          </div>
        </div>
      </Wrapper>
    </div>
  );
};

export default Home;
