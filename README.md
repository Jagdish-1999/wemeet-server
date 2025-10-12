# Important Points

1. Before listen or emit any event add the event in event.map.ts file in `socket-contract` in _`event.map.ts`_ file.
2. Event emmited from client should be added in this `ClientToServerEventMap` in `socket-contract`

3. _`*.gateway.ts`_ files are responsible to listen events emmited from client.
4. In _`*.gateway.ts`_ function name should be same as event name. otherwise it will give typescript error.
5. _`*.service.ts`_ files are responsible to db related logic.
   also you can emit you event from server
   the event also should be added in `ServerToClientEventMap` in `socket-contract`

## `1.` \*.gateway.ts

This file contains all Event listeners which is responsible to listen any event

Example-

```js
const chatList: ClientToServerEventMap["chatList"] = async (payload, cb) => {
    const mList = await getChatList(payload);
    const res = new Response({
        data: mList,
        message: "Message list loaded!",
    });
    cb(res);
};
```

## `2.` \*.service.ts

This file contains all logic connected to database

Example-

```js
const getChatList: ServiceHandler<"chatList"> = async ({
    senderId,
    receiverId,
}) => {
    try {
        const chats = await ChatModel.find({
            $or: [
                { senderId: senderId, receiverId: receiverId },
                { senderId: receiverId, receiverId: senderId },
            ],
        })
            .select("-__v -updatedAt")
            .lean();

        return chats as any as Chat[];
    } catch (error) {
        console.error("[Error] getChatList: ", error);
    }
    return [];
};
```

Note-
All events are handled by default if you follow these steps
