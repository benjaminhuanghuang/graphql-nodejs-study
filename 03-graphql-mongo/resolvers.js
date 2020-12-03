import { Friends } from "./dbConnectors";

// resolver map
export const resolvers = {
  Query: {
    getFriend: ({ id }) => {
      return new Friend(id, friendDatabase[id]);
    },
  },
  Mutation: {
    createFriend: ({ input }) => {
      const newFriend = new Friends({
        name: input.name,
      });
      newFriend.id = newFriend._id;
      return new Promise((resolve, object) => {
        newFriend.save((err) => {
          if (err) {
            reject(err);
          } else {
            resolve(newFriend);
          }
        });
      });
    },
  },
};
