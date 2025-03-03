import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    splashContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    homePageContainer:{
        flex:1,
        backgroundColor:'white',
        padding:10,
    },
    autocompleteContainer: {
        position: 'absolute',
        bottom: 10,
        left: 5,
        right: 5,
        backgroundColor: 'white',
        shadowRadius: 4,
        padding:10
    },
    input: {
        height: 40,
        borderWidth: 1,
        borderColor: '#999',
        borderRadius: 20,
        paddingHorizontal: 15,
      },
      resultItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
      },
      resultsContainer: {
        position: 'absolute',
        bottom: 60, 
        left: 10,
        right: 10,
        maxHeight:500,
        backgroundColor: 'white',
        borderWidth: 1,
        borderRadius:5,
        marginBottom:2,
        borderColor: '#eee',
        zIndex: 1, 
      },
      resultsList: {
        flex: 1,
        flexGrow: 1,
      },
      avatar: {
        width: 30,
        height: 30, 
        borderRadius: 15, 
        marginRight: 10 
      }
})
export default styles