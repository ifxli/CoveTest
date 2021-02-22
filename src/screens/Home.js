import React, { useEffect, useMemo } from 'react'
import { Text, Image, FlatList, TouchableOpacity } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'

import { fetchReservations } from '@store/toolkit/reservations'
import { addRoom } from '@store/toolkit/rooms'
import { getReservationsList } from '@store/selectors/reservations'
import { getRoomsList } from '@store/selectors/rooms'

/**
 * List cell for roomList
 * @param {*} room : room object {id, name, imageUrl}
 * @param {*} navigation 
 */
function Room({ room, navigation }) {
  return (
    <RoomContainer onPress={() => {navigation.navigate('Detail', {roomId: room.id})}}>
      <RoomImage source={{uri: room.imageUrl}} />
      <RoomName>{room.name}</RoomName>
    </RoomContainer>
  )
}

/**
 * Home Screen Component
 * @param {*} navigation 
 */
function Home({ navigation }) {
  const dispatch = useDispatch()
  const reservations = useSelector(getReservationsList)
  const rooms = useSelector(getRoomsList)

  // Call reservations api
  useEffect(() => {
    dispatch(fetchReservations())
  }, [dispatch])

  // Fetch rooms list from reservations list
  // Add room to redux
  useMemo(() => {
    if (reservations.length > 0) {
      const roomList = [...new Set(reservations.map(({ room }) => JSON.stringify(room)))];
      return roomList.map((room) => {
        const roomData = JSON.parse(room);
        dispatch(addRoom(roomData))
      });
    }
  }, [reservations])

  return (
    <Container 
      data={rooms}
      keyExtractor={(item, index) => item.id + index}
      renderItem={({ item } ) => (<Room room={item} navigation={navigation} />)}
    />
  )
}

const Container = styled(FlatList)`
  flex: 1;
  background-color: #fff;
`

const RoomContainer = styled(TouchableOpacity)`
  background-color: #eee;
  padding-vertical: 8px;
  padding-left: 15px;
  flex-direction: row;
  margin-top: 5;
`

const RoomImage = styled(Image)`
  width: 100;
  height: 80;
  resize-mode: contain;
  background-color: black;
`

const RoomName = styled(Text)`
  margin-left: 10;
  font-size: 20;
  font-weight: bold;
`

export default Home
