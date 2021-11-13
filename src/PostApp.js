import { Component } from "react";
import axios from "axios";
import { Table, Button} from 'react-bootstrap'

class PostApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            userId: "",
            title: "",
            body: "",
        }
    }

    // to get the posts from URL - completed
    getPosts = async () => {
        try {
            const {data} = await axios.get("https://jsonplaceholder.typicode.com/posts");
            this.setState({posts: data})
        } catch (err) {
            console.log(err);
        }
    }
    // Completed
    deletePost = async (id) => {
        try {
            await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
            const data = this.state.posts.filter((post) => post.id !== id);
            this.setState({posts: data})
        } catch (err) {
            console.log(err)
        }
        
    }
    //Creating new completed
    createPost = async () => {
        try {
            const {userId, title, body} = this.state;
            const {data} = await axios.post("https://jsonplaceholder.typicode.com/posts/", { userId, title, body});
            const posts = [...this.state.posts];
            posts.push(data);
            this.setState({posts, userId: "", title: "", body: ""});
        } catch (err) {
            console.error(err);
        }
    }

    updatePost = async () => {
        try {
            const {id, userId, title, body} = this.state;
            const {data} = await axios.put(`https://jsonplaceholder.typicode.com/posts/${id}`, { userId, title, body});
            const posts = [...this.state.posts];
            const index = this.state.posts.findIndex((post) => post.id === id);
            posts[index] = data;
            this.setState({posts, id:"", userId: "", title: "", body: ""});
        } catch (err) {
            console.error(err);
        }
    }
    // completed
    handleChange = ( {target: {name, value}}) => {
        console.log(this.state);
        this.setState({...this.state, [name]:value})
        console.log(this.state);
    }
    // half completed
    handleSubmit = (event) => {
        event.preventDefault();
        if (this.state.id) {
            this.updatePost();
        } else {
            this.createPost();
        }
    }

    editPost = (post) => {
        this.setState({...post})
    }

    componentDidMount () {
        this.getPosts();
    }

    render() {
        return (
            <>
            <h2> Post App</h2>
            <form onSubmit={this.handleSubmit}>
                <div>
                    <label>User ID: </label>
                    <input type="number" name="userId" onChange={this.handleChange} value={this.state.userId}/>
                </div>
                <br />
                <div>
                    <label>Title: </label>
                    <input type="text" name="title" onChange={this.handleChange} value={this.state.title}/>
                </div>
                <br />
                <div>
                    <label>Body: </label>
                    <input type="text" name="body" onChange={this.handleChange} value={this.state.body}/>
                </div>
                <br />
                <div>
                    <Button variant="primary" type="submit">Submit</Button>
                </div>
                <br />
            </form>
            <Table responsive striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>User ID</th>
                        <th>Title</th>
                        <th>Body</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.posts.map((post) => {
                        return (
                            <tr key={post.id}>
                                <td>{post.id}</td>
                                <td>{post.userId}</td>
                                <td>{post.title}</td>
                                <td>{post.body}</td>
                                <td><Button variant="danger" onClick={() => this.deletePost(post.id)}>Delete</Button>
                                <Button variant="secondary" onClick={() => this.editPost(post)}>Edit</Button></td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
            </>
        )
    }
}

export default PostApp;