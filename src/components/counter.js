import React, { Component } from 'react';
import { View, TextInput } from 'react-native';
import PropTypes from 'prop-types';
import ScalableText from 'react-native-text';

// components
import Button from './button';

// Styles
import Styles from '../styles/counter';

export default class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: this.props.start,
      // onChangeBefore loading --> disabled.
      beforeLoading: false,
    };
  }

  onPress(count, type) {
    const { onChangeBefore } = this.props;

    if (onChangeBefore) {
      return this.setState({ beforeLoading: true }, () => {
        onChangeBefore(() => {
          return this.onChange(count, type);
        });
      });
    }

    return this.onChange(count, type);
  }

  onChange(count, type) {
    const { onChange } = this.props;
    return this.setState({ count, beforeLoading: false }, () => {
      return onChange && onChange(count, type);
    });
  }

  onChangeText(e,type) {
    const { onChange } = this.props;
    return this.setState({ e, beforeLoading: false,count:Number(e) }, () => {
      return onChange && onChange(e, type);
    });
  }

  render() {
    const { count, beforeLoading } = this.state;

    return (
      <View style={Styles.container}>
        <Button
          type="-"
          count={this.state.count}
          onPress={this.onPress.bind(this)}
          disabled={beforeLoading}
          {...this.props}
        />

        <View style={Styles.count}>
          <TextInput keyboardType="numeric" style={this.props.textInputStyle}
            defaultValue={String(count)}
            onChangeText={this.onChangeText.bind(this)}
          />
        </View>

        <Button
          type="+"
          count={this.state.count}
          onPress={this.onPress.bind(this)}
          disabled={beforeLoading}
          {...this.props}
        />
      </View>
    );
  }
}

Counter.propTypes = {
  minus: PropTypes.string,
  plus: PropTypes.string,

  start: PropTypes.number,
  min: PropTypes.number,
  max: PropTypes.number,


  onChange: PropTypes.func,
  onChangeBefore: PropTypes.func,

  minusIcon: PropTypes.func,
  plusIcon: PropTypes.func,

  buttonStyle: PropTypes.object,
  buttonTextStyle: PropTypes.object,
  countTextStyle: PropTypes.object,
};

Counter.defaultProps = {
  minus: '-',
  plus: '+',

  start: 0,
  min: 0,
  max: 10,

  minusIcon: null,
  plusIcon: null,

  buttonStyle: {},
  buttonTextStyle: {},
  countTextStyle: {},

  onChangeBefore: null
};
