import React from 'react';

export default class CorkboardElement extends React.Component{
  constructor(props){
    super(props)

    this.state={
      paint: false,
      context: ""
    }
  }

  componentDidMount(){
    this.setState({
      context: document.getElementById(`canvas-${this.props.id}`).getContext("2d")
    })
  }

  startDrawing(event){
    let scaleX = this.state.context.canvas.width / this.state.context.canvas.getBoundingClientRect().width
    let scaleY = this.state.context.canvas.height / this.state.context.canvas.getBoundingClientRect().height
    this.state.context.clearRect(0, 0, this.state.context.canvas.width, this.state.context.canvas.height);
    this.state.context.moveTo((event.clientX - this.state.context.canvas.getBoundingClientRect().left)*scaleX, (event.clientY - this.state.context.canvas.getBoundingClientRect().top)*scaleY);
    this.setState({
      paint: true
    })
    console.log(event.clientX)
    console.log(this.state.context.canvas.getBoundingClientRect().left)
  }

  dragDrawing(event){
    let scaleX = this.state.context.canvas.width / this.state.context.canvas.getBoundingClientRect().width
    let scaleY = this.state.context.canvas.height / this.state.context.canvas.getBoundingClientRect().height
    if(this.state.paint){
      this.state.context.lineTo((event.clientX - this.state.context.canvas.getBoundingClientRect().left)*scaleX, (event.clientY - this.state.context.canvas.getBoundingClientRect().top)*scaleY);
      this.state.context.stroke();
    }
  }

  stopDrawing(event){
    this.setState({
      paint: false
    })
  }

  render(){
    return(
      <div>
      <canvas
        id={`canvas-${this.props.id}`}
        width={this.props.width+20}
        height={this.props.height}
        style={{position: "absolute", left: 0}}
        onMouseDown={this.startDrawing.bind(this)}
        onMouseLeave={this.stopDrawing.bind(this)}
        onMouseMove={this.dragDrawing.bind(this)}
        onMouseUp={this.stopDrawing.bind(this)} />
        </div>
    )
  }
}
