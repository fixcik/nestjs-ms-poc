import { Module } from '@nestjs/common';

import { HotelsController } from './hotels.controller';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { OrdersController } from './orders.controller';
import { HotelContacts, OrderContacts } from '@booking/contracts';

@Module({
  imports: [
    RabbitMQModule.forRoot(RabbitMQModule, {
      uri: process.env.RABBITMQ_URL,
      connectionInitOptions: { wait: false },
      defaultRpcTimeout: 10000,
      exchanges: [
        {
          name: HotelContacts.Exchange,
          type: 'topic'
        },
        {
          name: OrderContacts.Exchange,
          type: 'topic'
        }
      ]
    })
  ],
  controllers: [HotelsController, OrdersController],
  providers: []
})
export class AppModule {}
