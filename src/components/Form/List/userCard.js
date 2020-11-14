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

function UserCard({item}) {
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
      </CardItem>
      <CardItem cardBody>
        <Image
          source={{uri: item.cnic_image}}
          style={{height: 200, width: null, flex: 1}}
        />
      </CardItem>
      <CardItem>
        <Left>
          <Icon type="FontAwesome" name="phone" />
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
