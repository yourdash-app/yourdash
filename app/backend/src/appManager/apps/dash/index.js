import express from "express";
export default function main() {
    express().get(`/app/test`, (_req, res) => { return res.json({ text: `from dash app` }); });
}
