import { NextResponse } from "next/server";
import prisma from "../../../../lib/db";

export async function GET() {
    try {
        const cards = await prisma.card.findMany();
        return NextResponse.json({
            message: "OK",
            cards,
        });
    } catch (err) {
        return NextResponse.json(
            {
                message: "Error",
                err,
            },
            { status: 500 }
        );
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const card = await prisma.card.create({
            data: {
                titulo: body.titulo,
                imagem: body.imagem,
                texto: body.texto,
                createdAt: body.createdAt,
            },
        });
        console.log("Card criado!", card);
        return NextResponse.json({
            message: "OK",
            card,
        });
    } catch (err) {
        return NextResponse.json(
            {
                message: "Error",
                err,
            },
            { status: 500 }
        );
    }
}

export async function PUT(req: Request) {
    try {
        const card = await req.json();
        const newCard = await prisma.card.update({
            where: {
                id: card.id,
            },
            data: {
                titulo: card.titulo,
                imagem: card.imagem,
                texto: card.texto,
                createdAt: card.createdAt,
            },
        });
        return NextResponse.json({
            message: "OK",
            newCard,
        });
    } catch (err) {
        return NextResponse.json(
            {
                message: "Error",
                err,
            },
            { status: 500 }
        );
    }
}

export async function DELETE(req: Request) {
    try {
        const { id } = await req.json();
        const card = await prisma.card.delete({
            where: {
                id,
            },
        });
        return NextResponse.json({
            message: "OK",
            card,
        });
    } catch (err) {
        return NextResponse.json(
            {
                message: "Error",
                err,
            },
            { status: 500 }
        );
    }
}
