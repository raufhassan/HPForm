import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  TextInput,
  Picker,
  ScrollView,
  Button,
  Image,
} from "react-native";
import Style from "../styles";

export function Husband(props) {
  //   const [unemploy, setUnemploy] = useState("");
  //   console.log(props.data.HbUnemp);
  var data = props.data;
  let input, input2;
  if (data.HbUnemp === "Permenant") {
    input2 = (
      <>
        <TextInput
          value={data.Hbprofession}
          onChangeText={(value) => props.onProfessionChange(value)}
          placeholder={"Temporary"}
          style={Style.input}
        />
        {data.HbprofessionErr ? (
          <Text style={Style.error}>{data.HbprofessionErr}</Text>
        ) : null}
      </>
    );
  }
  if (data.HbUnemp === "Profession") {
    input2 = (
      <>
        <TextInput
          value={data.HbReason}
          onChangeText={(value) => props.onReasonChange(value)}
          placeholder={"Reason"}
          style={Style.input}
        />
        {data.HbReasonErr ? (
          <Text style={Style.error}>{data.HbReasonErr}</Text>
        ) : null}
      </>
    );
  }
  if (data.HbState === "Employed") {
    input = (
      <>
        <TextInput
          value={data.Hbprofession}
          onChangeText={(value) => props.onProfessionChange(value)}
          placeholder={"Husband profession"}
          style={Style.input}
        />
        <TextInput
          value={data.Hbincome}
          onChangeText={(value) => props.onIncomeChange(value)}
          placeholder={"Husband income"}
          style={Style.input}
        />
        <TextInput
          value={data.Hbcompany}
          onChangeText={(value) => props.onCompanyChange(value)}
          placeholder={"Husband company"}
          style={Style.input}
        />
      </>
    );
  }
  if (data.HbState === "Unemployed") {
    input = (
      <>
        <View style={Style.picker}>
          <Picker
            itemStyle={{ color: "blue" }}
            selectedValue={data.HbUnemp}
            onValueChange={(value) => {
              if (value !== "-1") {
                props.onUnEmpChange(value);
              }
            }}
          >
            <Picker.Item label="Husband unemployement Type" value="-1" />
            <Picker.Item label="Permenant" value="Permenant" />
            <Picker.Item label="Temporary" value="Temporary" />
          </Picker>
        </View>
        {data.HbUnempErr ? (
          <Text style={Style.error}>{data.HbUnempErr}</Text>
        ) : null}
        {input2}
      </>
    );
  }
  return (
    <>
      <View style={Style.picker}>
        <Picker
          itemStyle={{ color: "blue" }}
          selectedValue={data.HbState}
          onValueChange={(value) => props.onStatusChange(value)}
        >
          <Picker.Item label="Husband employment status" value="-1" />
          <Picker.Item label="Employed" value="Employed" />
          <Picker.Item label="Unemployed" value="Unemployed" />
        </Picker>
      </View>
      {data.HbStateErr ? (
        <Text style={Style.error}>{data.HbStateErr}</Text>
      ) : null}
      {input}
    </>
  );
}
