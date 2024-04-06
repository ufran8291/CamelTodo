import { convertStringArrayToDate } from '@ant-design/react-native/lib/date-picker/date-picker-date-utils'
import React from 'react'
import { StyleSheet, Text, View,TextInput} from 'react-native'
import colors from '../misc/colors'

const SearchBar = () => {
    return (
        <view style = {styles.cointainer}>
            <TextInput style = {styles.SearchBar} placeholder = 'Search here..'/>
        </view>
    )
}

const styles = StyleSheet.create({
    cointainer:{},
    SearchBar:{
        borderWidth: 0.5,
        borderColor: colors.PRIMARY,
        height: 40,
        borderRadius: 40,
        paddingLeft: 15,
        fontSize: 20,
    }
})

export default SearchBar;