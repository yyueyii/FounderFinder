import { View, Text, FlatList, StyleSheet, Map } from 'react-native'
import React from 'react'

const SkillBubble = ( { skills }) => {
    return (
        <View style={styles.container}>
        { skills.map((entry, index) => (
          <View key={index} style={styles.skillBubble}>
            <Text>{entry}</Text>
          </View>
         )
         )}
      </View>
    );
}

export default SkillBubble

const styles = StyleSheet.create({
    container: {
        backgroundColor:'transparent',
        paddingBottom:10,
        alignItems:'flex-start',
        flexDirection: 'row',
        flexWrap: 'wrap',

    },
    skillBubble: {
        backgroundColor:'#E1E6E8',
        borderRadius:15,
        padding:8,
        margin:2,
        justifyContent:'center',
        alignItems:'center',
        paddingHorizontal:18,
    }
})