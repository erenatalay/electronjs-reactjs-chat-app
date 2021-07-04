import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { fetchChats } from '../actions/chats'
import AvailableChatsList from '../components/AvailableChatsList'
import JoinedChatList from '../components/JoinedChatList'
import ViewTitle from '../components/shared/ViewTitle'
import { useDispatch, useSelector } from "react-redux"
import { viewBaseLayout } from "../layouts/Base"
import Notifications from '../utils/notifications'

const Home = () => {
    const dispatch = useDispatch()
    const joinedChats = useSelector(({ chats }) => chats.joined)
    const availableChats = useSelector(({ chats }) => chats.available)
    useEffect(() => {
        Notifications.setup();
        dispatch(fetchChats())
    }, [dispatch])
    return (

        <div className="row no-gutters fh">
            <div className="col-3 fh">
                <JoinedChatList chats={joinedChats} />
            </div>
            <div className="col-9 fh">
                <ViewTitle text="Choose your channel" >
                    <Link className="btn btn-outline-primary" to="/chatCreate">New</Link>
                </ViewTitle>

                <AvailableChatsList chats={availableChats} />
            </div>
        </div>

    )
}

export default viewBaseLayout(Home);
