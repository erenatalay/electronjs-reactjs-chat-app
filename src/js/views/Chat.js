import React from 'react'
import {useParams} from "react-router-dom";
import ChatMessagesList from '../components/ChatMEssagesList'
import ChatUserList from '../components/ChatUserList'
import ViewTitle from '../components/shared/ViewTitle'

const Chat = () => {
    const {id} = useParams();
    return (
        <div>
            <div className="row no-gutters fh">
                <div className="col-3 fh">
                    <ChatUserList />
                </div>
                <div className="col-9 fh">
                    <ViewTitle text={`Joined Channel:${id}`} />
                    <ChatMessagesList />
                </div>
            </div>
        </div>
    )
}

export default Chat
