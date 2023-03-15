import 'package:flutter/material.dart';
import 'package:flutter/src/widgets/framework.dart';
import 'package:flutter/src/widgets/placeholder.dart';
import 'package:socket_io_client/socket_io_client.dart' as IO;

class PaintScreen extends StatefulWidget {
  const PaintScreen({super.key, required this.data, required this.screenFrom});
  final Map<String, String> data;
  final String screenFrom;

  @override
  State<PaintScreen> createState() => _PaintScreenState();
}

class _PaintScreenState extends State<PaintScreen> {
  late IO.Socket _socket;
  String? dataofRoom = "";
  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    connect();
  }

  //Socket Io client connection
  void connect() {
    _socket = IO.io('http://192.168.0.9:3000', <String, dynamic>{
      'transports': ['websocket'],
      'autoConnect': false
    });

    _socket.connect();

    if (widget.screenFrom == 'createRoom') {
      _socket.emit('create-game', widget.data);
    }

    //listen to socket
    _socket.onConnect((data) {
      _socket.on('updateRoom', (roomData) {
        setState(() {
          dataofRoom = roomData;
        });

        if (roomData['isJoin'] != true) {
          //start the timer
        }
      });
      _socket.on('notCorrectGame', (roomData) {
        print(roomData);
      });
      print('connected');
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(),
    );
  }
}
