import { useSelector } from "react-redux";
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const BlogList = () => {
    const blogs = useSelector((state) => state.blogs)

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: "solid",
        borderWidth: 1,
        marginBottom: 5,
    };

    return (
        <div>
            <Table striped>
                    <tbody>
                    {blogs.map(blog => (
                        <tr key={blog.id} style={blogStyle}>
                            <td>
                                <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                            </td>
                            <td>
                                {blog.author}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
}

export default BlogList