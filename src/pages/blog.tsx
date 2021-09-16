import { FC } from "react";
import PageHead from "../components/PageHead";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { client } from "../libs/client";
import { dateToYYYYMMDD } from "../utils/util";
import {
    BlogListResponse,
    BlogResponse,
    TagListResponse,
    TagResponse,
} from "../types/api";

interface Props {
    blog: BlogResponse[];
    tag: TagResponse[];
}

const BlogPage: FC<Props> = ({ blog, tag }) => {
    return (
        <>
            <PageHead title="BLOG" />
            <Header />
            <main>
                <h2>BLOG</h2>
                <h3>タグ一覧</h3>
                <ul>
                    {tag.map((tag: TagResponse) => (
                        <li key={tag.id}>
                            <Link href={`/blog/tag/${tag.id}`}>
                                <a>{tag.name}</a>
                            </Link>
                        </li>
                    ))}
                </ul>
                <h3>記事一覧</h3>
                <ul>
                    {blog.map((blog: BlogResponse) => (
                        <li key={blog.id}>
                            <Link href={`/blog/article/${blog.id}`}>
                                <a>{blog.title}</a>
                            </Link>
                            [{blog.tag.name}] (
                            {dateToYYYYMMDD(blog.publishedAt)})
                        </li>
                    ))}
                </ul>
            </main>
            <Footer />
        </>
    );
};

export const getStaticProps = async () => {
    const blogData = await client.get<BlogListResponse>({ endpoint: "blog" });
    const tagData = await client.get<TagListResponse>({ endpoint: "tags" });
    return {
        props: {
            blog: blogData.contents,
            tag: tagData.contents,
        },
    };
};

export default BlogPage;