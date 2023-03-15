import 'package:flutter/src/widgets/framework.dart';
import 'package:flutter/src/widgets/placeholder.dart';

class PaintScreen extends StatefulWidget {
  const PaintScreen({super.key});

  @override
  State<PaintScreen> createState() => _PaintScreenState();
}

class _PaintScreenState extends State<PaintScreen> {
  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    connect();
  }

  //Socket Io client connection
  void connect() {}

  @override
  Widget build(BuildContext context) {
    return const Placeholder();
  }
}
