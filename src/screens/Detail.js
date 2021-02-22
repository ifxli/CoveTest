import React, { useMemo, useLayoutEffect } from 'react'
import { View, Text, Button, Alert } from 'react-native'
import { useSelector } from 'react-redux'
import { Agenda } from 'react-native-calendars'
import { DateTime } from 'luxon'
import styled from 'styled-components'

import { getReservationsList } from '@store/selectors/reservations'
import { getRoomsList } from '@store/selectors/rooms'

/**
 * Detail Screen Component
 * @param {*} route
 * @param {*} navigation
 */
function Detail({ route, navigation }) {
  const { roomId } = route.params;
  const reservations = useSelector(getReservationsList)
  const rooms = useSelector(getRoomsList)

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button onPress={() => {Alert.alert('Add reservation button clicked')}} title=" + " />
      ),
    });
  }, [navigation]);

  const getDateStringFromISO = (date) => {
    return date.split('T')[0]
  }
  const today = getDateStringFromISO(DateTime.now().toISO())

  // Get reservations for this room by checking it's id
  const reservationsForRoom = useMemo(() => {
    if (reservations.length > 0) {
      return reservations.filter(({ room }) => room.id === roomId);
    }
  }, [reservations])

  let selectedDate = today
  // Get markedDates that have schedule
  // Set selectedDate as it's earliest in the future
  const markedDates = useMemo(() => {
    if (reservationsForRoom.length > 0) {
      // Get unique dates array
      const dates = [...new Set(reservationsForRoom.map(( reservation ) => getDateStringFromISO(reservation.start)))];
      const sortedDates = dates.sort()
      // Set selectedDate as it's last in sorted array
      selectedDate = sortedDates.slice(-1)[0]
      let markedDates = {};
      sortedDates.forEach(item => {
        if (today <= item && item < selectedDate) {
          selectedDate = item
        }
        markedDates[item] = {marked: true}
      })
      return markedDates
    }
  }, [reservationsForRoom])

  // Update reservation list to match data schema of Agenda
  const reservationsForAgenda = useMemo(() => {
    const markedDatesKeys = Object.keys(markedDates)
    if (markedDatesKeys.length > 0) {
      const sortedData = {};
      (Object.keys(markedDates)).map((day) => {
        const data = reservationsForRoom.filter((reservation) => getDateStringFromISO(reservation.start) === day)
        sortedData[day] = data.sort((a, b) => DateTime.fromISO(b.start) - DateTime.fromISO(a.start))
      })
      return sortedData;
    }
  }, [markedDates])

  return (
    <Agenda
      items={reservationsForAgenda}
      selected={selectedDate}
      renderItem={(item) => {
        return (
          <Reservation>
            <Title>
              Scheduled At:
            </Title>
            <ReservationText>
              Start: {DateTime.fromISO(item.start).toLocaleString(DateTime.DATETIME_FULL)}
            </ReservationText>
            <ReservationText>
              End: {DateTime.fromISO(item.end).toLocaleString(DateTime.DATETIME_FULL)}
            </ReservationText>
          </Reservation>
        )
      }}
      pastScrollRange={2}
      futureScrollRange={6}
      markedDates={markedDates}
    />
  )
}

const Reservation = styled(View)`
  background-color: white;
  border-radius: 5;
  padding-vertical: 10;
  padding-horizontal: 10;
  marginRight: 10;
  marginTop: 17;
`

const Title = styled(Text)`
  font-size: 16;
  font-weight: bold;
`

const ReservationText = styled(Text)`
  font-size: 16;
  line-height: 24;
`

export default Detail
