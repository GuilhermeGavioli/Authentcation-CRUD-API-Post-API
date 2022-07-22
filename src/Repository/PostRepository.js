


import { Post } from "../../models/post"
class PostClass {

    //Create User
    async create(postId, text, ownerId) {
        await Post.create({
            id: postId , text, owner: ownerId
        })
    }
    

    //Find a User
    async update(id, owner, newText) {
      
        await Post.update({ text: newText }, {
            where: {id: id, owner: owner}
        })

       
    }

    async findOne(id){
        const foundPost = await Post.findOne({
            attributes: ["id", "owner", 'text'],
            where: {id: id}
        })

        return JSON.parse(JSON.stringify(foundPost));
    }

    async delete(id, owner) {
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

    async findManyFromUser(ownerId) {
        return JSON.parse(
            JSON.stringify(
                await Post.findAll({
                    attributes: ["id", "text", "owner", "createdAt"],
                    where: {
                        owner: ownerId
                    }
                })
            )
        )
    }



 }

export const PostInstancy = new PostClass();

