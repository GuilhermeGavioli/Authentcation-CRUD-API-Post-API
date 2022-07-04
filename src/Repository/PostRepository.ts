
interface IPostClass {
    create(postId: string, text:string, ownerId: string): Promise<void>,
    update(id: string, owner: string, newText: string): Promise<void>,
    findOne(id: string): Promise<IPost>,
    delete(id: string, owner: string): Promise<void>,
    findAll(): Promise<ISecurePost[]>,
}

interface IPost {
    id: string,
    text: string,
    owner: string,
}

interface ISecurePost { 
    text: string,
    owner: string
}
 

import { Post } from "../../models/post"

class PostClass implements IPostClass {

    //Create User
    async create(postId: string, text: string, ownerId: string): Promise<void> {
        await Post.create({
            id: postId , text, owner: ownerId
        })
    }
    

    //Find a User
    async update(id: string, owner: string, newText: string) {
      
        await Post.update({ text: newText }, {
            where: {id: id, owner: owner}
        })

       
    }

    async findOne(id: string){
        const foundPost = await Post.findOne({
            attributes: ["id", "owner", 'text'],
            where: {id: id}
        })

        return JSON.parse(JSON.stringify(foundPost));
    }

    async delete(id: string, owner: string) {
        const post = await Post.findOne({
            attributes: ["id", "text", 'owner'],
            where: { id: id, owner: owner }
        })
        await post?.destroy();
    }
    

    async findAll() { 
        return JSON.parse(
            JSON.stringify(
                await Post.findAll({
                    attributes: ["text", "owner"]
                })
            )
        )
    }



 }

export const PostInstancy = new PostClass();

