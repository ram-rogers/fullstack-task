import React, { useState } from "react";
import { faker } from "@faker-js/faker";
import { Link } from "react-router-dom";

function createRandomPost() {
    return {
        title: `${faker.hacker.adjective()} ${faker.hacker.noun()}`,
        body: faker.hacker.phrase(),
        likes: Math.floor(Math.random() * 100), // Random initial likes
        dislikes: Math.floor(Math.random() * 50), // Random initial dislikes
    };
}

function BlogPost() {
    const [posts, setPosts] = useState(() =>
        Array.from({ length: 8 }, () => createRandomPost())
    );

    const handleLike = (index) => {
        setPosts((prevPosts) => {
            const updatedPosts = [...prevPosts];
            updatedPosts[index].likes++;
            return updatedPosts;
        });
    };

    const handleDislike = (index) => {
        setPosts((prevPosts) => {
            const updatedPosts = [...prevPosts];
            updatedPosts[index].dislikes++;
            return updatedPosts;
        });
    };

    return (
        <div className="flex flex-col h-screen w-full p-4 text-white bg-gray-900">
            <header className="mb-8 font-bold flex flex-row justify-start items-center gap-4">
                <img className='h-9 w-9' src="https://img-c.udemycdn.com/organization_favicon/32x32/79488_3202.png" alt="" />
                Blog App
            </header>
            <main>
                <section className="max-w-screen-xl mx-auto">
                    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {posts.map((post, i) => (
                            <li key={i} className="border border-yellow-200 p-4">
                                <h3 className="capitalize mb-4 text-gray-300 font-bold">
                                    {post.title}
                                </h3>
                                <p className="capitalize mb-4 text-gray-100">{post.body}</p>
                                <div className="flex justify-between">
                                    <button
                                        className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                                        onClick={() => handleLike(i)}
                                    >
                                        Like ({post.likes})
                                    </button>
                                    <button
                                        className="text-white bg-green-600 px-4 py-2 rounded"
                                        onClick={() => handleDislike(i)}
                                    >
                                        Dislike ({post.dislikes})
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </section>
            </main>
            <Link
                to="/login"
                className="bg-red-500 text-white px-4 py-2 rounded absolute top-0 right-0 m-4"
            >
                Logout
            </Link>
        </div>
    );
}

export default BlogPost;
