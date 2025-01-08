import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text } from '@rneui/themed';
import DateTimePicker from '@react-native-community/datetimepicker';
import { formatDate } from '../../utils/date';

interface DateRangePickerProps {
  checkIn: Date;
  checkOut: Date;
  onCheckInChange: (date: Date) => void;
  onCheckOutChange: (date: Date) => void;
}

export const DateRangePicker: React.FC<DateRangePickerProps> = ({
  checkIn,
  checkOut,
  onCheckInChange,
  onCheckOutChange
}) => {
  const [showCheckIn, setShowCheckIn] = React.useState(false);
  const [showCheckOut, setShowCheckOut] = React.useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.dateContainer}>
        <Text style={styles.label}>Check-in</Text>
        <Button
          title={formatDate(checkIn)}
          onPress={() => setShowCheckIn(true)}
          type="outline"
        />
        {showCheckIn && (
          <DateTimePicker
            value={checkIn}
            mode="date"
            minimumDate={new Date()}
            onChange={(event, date) => {
              setShowCheckIn(false);
              if (date) onCheckInChange(date);
            }}
          />
        )}
      </View>

      <View style={styles.dateContainer}>
        <Text style={styles.label}>Check-out</Text>
        <Button
          title={formatDate(checkOut)}
          onPress={() => setShowCheckOut(true)}
          type="outline"
        />
        {showCheckOut && (
          <DateTimePicker
            value={checkOut}
            mode="date"
            minimumDate={new Date(checkIn.getTime() + 86400000)}
            onChange={(event, date) => {
              setShowCheckOut(false);
              if (date) onCheckOutChange(date);
            }}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  dateContainer: {
    marginVertical: 5,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#666',
  },
});