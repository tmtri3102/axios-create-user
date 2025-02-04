import React, { Component } from "react";
import axios from "axios";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Users from "./pages/Users";
import UserDetails from "./pages/UserDetails";

// export default function App() {
//     return (
//         <BrowserRouter>
//             <Routes>
//                 <Route path="/" element={<Users />} />
//                 <Route path={"/user/add"} element={<UserDetails />} />
//                 <Route path={`/user/:userId`} element={<UserDetails />} />
//             </Routes>
//         </BrowserRouter>
//     );
// }

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            loading: false
        };
    }

    componentDidMount() {
        // this.setState({ loading: true });
        // this.getUsers()
        //     .then(res => {
        //         this.setState({ users: res.data });
        //     })
        //     .catch(err => {
        //         throw err;
        //     })
        //     .finally(() => {
        //         this.setState({ loading: false });
        //     });
        const getUsers = axios.get("http://localhost:3001/api/users");
        const getArticle = axios.get("http://localhost:3001/api/articles");
        // then handle all 2 get request and match res1 to getUsers, res2 to getArticle
        axios
            .all([getUsers, getArticle])
            .then(
                axios.spread((res1, res2) => {
                    const users = res1.data.map(user => {
                        console.log("res1.data", res1.data);
                        console.log("user", user);
                        return {
                            ...user,
                            article: res2.data.filter(item => {
                                console.log("res2.data", res2.data);

                                return item.user_id === user.id;
                            })
                        };
                    }); // lay data cua response, wrap trong user object, them article property - aka another object but filter that match user id
                    this.setState({ users: users });
                })
            )
            .catch(err => {
                throw err;
            });
    }

    // PROMISE
    // getUsers = () => {
    //     return new Promise((resolve, reject) => {
    //         setTimeout(() => {
    //             axios
    //                 .get("http://localhost:3001/api/users")
    //                 .then(res => {
    //                     resolve(res);
    //                 })
    //                 .catch(err => {
    //                     reject(err);
    //                 });
    //         }, 3000);
    //     });
    // };

    // ASYNC - AWAIT
    getUsers = async () => {
        await new Promise(resolve => {
            setTimeout(resolve, 3000);
        });
        return await axios.get("http://localhost:3001/api/users");
    };

    render() {
        const {users } = this.state;
        // if (loading) return <p>loading...</p>;
        return (
            <div>
                <h1>Users</h1>
                <table>
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Article numbers</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map ( user => (
                        <tr key={user.id}>
                            <td> {user.name} </td>
                            <td> {user.article.length} </td>
                        </tr>
                    ) )}
                    </tbody>
                </table>
                {/*<ul>*/}
                {/*    {users.map(user => (*/}
                {/*        <li key={user.id}> {user.name} </li>*/}
                {/*    ))}*/}
                {/*</ul>*/}
            </div>
        );
    }
}

export default App;