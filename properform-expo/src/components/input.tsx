import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  Button,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

interface SmartInputProps {
  title: string;
  value: string;
  placeholder: string;
  onChange: (text: string) => void;
}

const SmartInput: React.FC<SmartInputProps> = ({
  title,
  value,
  placeholder,
  onChange,
}) => {
  const [showPicker, setShowPicker] = useState(false);
  const [tempDate, setTempDate] = useState<Date>(new Date()); // nur zwischenspeicher
  const [confirmedDate, setConfirmedDate] = useState<Date | null>(null);

  const lowerTitle = title?.toLowerCase?.() || "";
  const isPassword =
    lowerTitle === "passwort" || lowerTitle === "passwort wiederholen";
  const isDate = lowerTitle === "geburtsdatum" || lowerTitle === "datum";

  const onDateChange = (_: any, selectedDate?: Date) => {
    if (Platform.OS === "android") {
      if (selectedDate) {
        setConfirmedDate(selectedDate);
        onChange(selectedDate.toISOString().split("T")[0]);
      }
      setShowPicker(false);
    } else {
      if (selectedDate) setTempDate(selectedDate);
    }
  };

  const confirmIOSDate = () => {
    setConfirmedDate(tempDate);
    onChange(tempDate.toISOString().split("T")[0]);
    setShowPicker(false);
  };

  const formattedDate =
    confirmedDate?.toISOString().split("T")[0] || value || placeholder;

  return (
    <TouchableWithoutFeedback
      onPress={() => setShowPicker(false)}
      accessible={false}
    >
      <View style={{ marginVertical: 8 }}>
        <Text style={{ fontWeight: "600", marginBottom: 4 }}>{title}</Text>

        {isDate ? (
          <>
            <Pressable
              onPress={() => {
                Keyboard.dismiss();
                setShowPicker(true);
              }}
              style={{
                borderWidth: 1,
                borderColor: "#ccc",
                borderRadius: 8,
                padding: 10,
              }}
            >
              <Text style={{ color: value ? "#000" : "#999" }}>
                {formattedDate}
              </Text>
            </Pressable>

            {showPicker && (
              <View
                style={{
                  backgroundColor: "#f9f9f9",
                  borderRadius: 10,
                  marginTop: 10,
                }}
              >
                <DateTimePicker
                  value={tempDate}
                  mode="date"
                  display={Platform.OS === "ios" ? "spinner" : "default"}
                  onChange={onDateChange}
                  locale="de-DE"
                  themeVariant="light"
                />
                {Platform.OS === "ios" && (
                  <Button title="Fertig" onPress={confirmIOSDate} />
                )}
              </View>
            )}
          </>
        ) : (
          <TextInput
            value={value}
            onChangeText={onChange}
            placeholder={placeholder}
            placeholderTextColor={"#9CA3AF"}
            secureTextEntry={isPassword}
            style={{
              borderWidth: 1,
              borderColor: "#ccc",
              borderRadius: 8,
              padding: 10,
              color: "#000",
            }}
          />
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default SmartInput;
