import mongoose, { HydratedDocument, SchemaType, isValidObjectId} from "mongoose";
import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";



export type UserDocument = HydratedDocument<User>

@Schema()
export class User {

    @Prop({ type: mongoose.Schema.Types.ObjectId, auto: true })
    _id: any;

    @ApiProperty()
    @Prop({ required: true })
    name: string

    @ApiProperty()
    @Prop()
    surname: string

    @ApiProperty()
    @Prop( { required: true, unique: true } )
    email: string

    @ApiProperty()
    @Prop( { required: true } )
    password: string

    @ApiProperty()
    @Prop( { required: true } )
    number: number


    @Prop({ default: true })
    active: boolean


   

}


export const UserSchema = SchemaFactory.createForClass(User)
