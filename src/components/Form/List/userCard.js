import React, {Component} from 'react';
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Thumbnail,
  Text,
  Button,
  Icon,
  Left,
  Body,
  Right,
} from 'native-base';
import {Image, View, TouchableOpacity} from 'react-native';

function UserCard({item, actionOnRow, showAlert}) {
  //   console.log(item.cnic_image);
  return (
    <Card>
      <CardItem>
        <Left>
          {/* <Thumbnail source={{uri: 'Image URL'}} /> */}
          <Body>
            <Text>{item.first_name}</Text>
            <Text note>{item.address}</Text>
          </Body>
        </Left>
        <Right>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity onPress={() => actionOnRow(item)}>
              <Icon
                type="FontAwesome"
                name="edit"
                style={{fontSize: 20, color: 'grey'}}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => showAlert(item)}>
              <Icon
                type="FontAwesome"
                name="trash"
                style={{fontSize: 20, color: 'grey', marginLeft: 10}}
              />
            </TouchableOpacity>
          </View>
        </Right>
      </CardItem>
      <CardItem cardBody>
        <Image
          source={{uri: item.profile_image}}
          style={{height: 200, width: null, flex: 1}}
        />
      </CardItem>
      <CardItem>
        <Left>
          <Icon
            type="FontAwesome"
            name="phone"
            style={{fontSize: 20, color: 'grey'}}
          />
          <Text>{item.contact}</Text>
        </Left>

        <Right>
          <Text style={{color: 'blue'}}>{item.family_is}</Text>
        </Right>
      </CardItem>
    </Card>
  );
}

export default UserCard;
