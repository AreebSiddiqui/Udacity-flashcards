import React, { Component } from "react";
import { Text,TouchableOpacity } from "react-native";
export default function SnapBtn({ onPress, styles, text, color }) {
	return (
		<TouchableOpacity
			onPress={onPress}
			style={[styles.androidBtn, { backgroundColor: color }]}
		>
			<Text style = {styles.submitBtnText}> {text}</Text>
		</TouchableOpacity>
	);
}
