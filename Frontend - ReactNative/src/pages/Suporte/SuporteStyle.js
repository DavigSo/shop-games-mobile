import { StyleSheet } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";


const SuporteStyle = StyleSheet.create({
  sendButton: {
    backgroundColor: Colors.primary,
    color: Colors.white,
    height: 40,
    width: 70,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    marginRight: 5,
  },
  input:{
    width: '100%',
    height: 40,
    borderColor: '#848484',
    borderWidth: 1,
    marginTop: '3%',
    marginBottom: "5",
    padding: 10
  },
  changeNameView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 50,
    backgroundColor: 'white'
  },
  container: {
    marginTop: 16,
    marginHorizontal: 16,
  },
  scrollViewContainer:{
    paddingHorizontal: 10,
    paddingVertical: 10,
    top: 10,
  },
  messageTextInputContainer: {
    justifyContent: 'flex-end',
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderColor: 'transparent',
    borderTopColor: Colors.light,
    alignItems: 'center',
    flexDirection: 'row',
  },
  messageTextInput:{
    flex: 1,
    minHeight: 40,
    maxHeight: 90,
    paddingHorizontal: 12,
    fontSize: 17,
    marginHorizontal: 5,
    borderColor: Colors.light,
    borderWidth: 1,
    backgroundColor: Colors.white,
    borderRadius: 20,
  },
})

export default SuporteStyle

