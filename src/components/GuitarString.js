import React from 'react';
import { note } from "@tonaljs/tonal";
import { simplify, enharmonic } from "@tonaljs/note"

class GuitarString extends React.Component {

    constructor(props){
      super(props)
      this.state = {
        frets: []
      }
    }

    componentDidMount() {
      this.computeFrets(this.props.rootNote)
    }

    componentWillReceiveProps(nextProps){
      this.computeFrets(nextProps.rootNote)
    }

    render() {
      let frets = this.state.frets.map((aNote, i) => {
        let p = (this.props.validnotes.includes(aNote)) ? 'played' : 'notplayed'
        if (p === 'notplayed'){
          p = (this.props.validnotes.includes(enharmonic(aNote))) ? 'played' : 'notplayed'
        }
        if (i===0){
          if (p === 'notplayed'){
          return (<td key={'string'+i+aNote} class={p}><div class={'notename'}>{aNote}</div><div class='circle'></div><div class={'smallhide'}>x</div></td>)
          }
          return (<td key={'string'+i+aNote} class={p}><div class={'notename'}>{aNote}</div><div class='circle'></div><div class={'small'}>{i}</div></td>)
        }
        if (p === 'notplayed'){
        return (<td key={'string'+i+aNote} class={p}><div class='circle'></div><div class={'smallhide'}>x</div></td>)
        }
        return (<td key={'string'+i+aNote} class={p}><div class='circle'></div><div class={'small'}>{i}</div></td>)
      })
      return (<div key={'string'+this.props.stringkey} class='guitarstring'><table class='string'>
        <tr class="frets">
          {frets}
        </tr>
        </table></div>)
    }

    computeFrets = (rootNote) => {
      let root = note(rootNote)
      let oct = root.oct
      let str = root.letter
      let ns = []
      ns.push(simplify(root.name))
      for (var i = 0; i < 15; i++){
        str += '#'
        ns.push(simplify(str + oct))
      }
      this.setState({frets:ns})
    }


}

export default GuitarString;
