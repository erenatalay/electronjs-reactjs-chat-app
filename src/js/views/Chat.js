import React, { useEffect, useRef, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import ChatMessagesList from '../components/ChatMEssagesList'
import ChatUserList from '../components/ChatUserList'
import ViewTitle from '../components/shared/ViewTitle'
import { viewBaseLayout } from "../layouts/Base"
import { subscribeToChat, subscribeToProfile } from '../actions/chats';
import LoadingView from '../components/shared/LoadingView';
import Messenger from '../components/Messenger';

const Chat = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const peopleWatchers = useRef({})
    const activeChat = useSelector(({ chats }) => chats.activeChats[id])
    const joinedUsers = activeChat?.joinedUsers;
    useEffect(() => {
        const unSubFromChat = dispatch(subscribeToChat(id))

        return () => {
            unSubFromChat();
            unsubFromJoinedUsers();
        }
    }, [])

    useEffect(() => {
        joinedUsers && subscribeToJoinedUsers(joinedUsers)


    }, [joinedUsers])
    const subscribeToJoinedUsers = useCallback(jUsers => {
        jUsers.forEach(user => {
            if (!peopleWatchers.current[user.uid]) {
                peopleWatchers.current[user.uid] = dispatch(subscribeToProfile(user.uid, id))

            }
        })
    }, [dispatch, id]) 

    const sendMessage = message => {
        alert(JSON.stringify(message))
    }


    const unsubFromJoinedUsers = useCallback(() => {
        Object.keys(peopleWatchers.current)
            .forEach(id => peopleWatchers.current[id]())
    }, [peopleWatchers.current])

    if (!activeChat?.id) {
        return <LoadingView message="Loading Chat..." />
    }
    return (
        <div className="row no-gutters fh">
            <div className="col-3 fh">
                <ChatUserList users={activeChat?.joinedUsers} />
            </div>
            <div className="col-9 fh">
                <ViewTitle text={`Channel:${activeChat?.name}`} />
                <ChatMessagesList />
                <Messenger onSubmit={sendMessage} />

            </div>

        </div>
    )
}

export default viewBaseLayout(Chat, { canGoBack: true })