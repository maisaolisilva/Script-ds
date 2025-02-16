import mongoose, { Schema, model, models } from 'mongoose';

interface ICliente extends mongoose.Document {
    _id: mongoose.Types.ObjectId;
    nome: string;
    email: string;
    telefone: string;
    createdAt: Date;
    updatedAt: Date;
}

const clienteSchema = new Schema<ICliente>({
    nome: {
        type: String,
        required: [true, 'O nome é obrigatório']
    },
    email: {
        type: String,
        required: [true, 'E-mail é obrigatório'],
        unique: true,
        index: true
    },
    telefone: {
        type: String,
        required: [true, 'O número de telefone é obrigatório'],
        match: [/^\d{10,11}$/, 'Número de telefone inválido']
    }
}, { timestamps: true });

const Cliente = models.Cliente || model<ICliente>('Cliente', clienteSchema);

export default Cliente;