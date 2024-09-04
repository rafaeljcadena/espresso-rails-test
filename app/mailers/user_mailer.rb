class UserMailer < ApplicationMailer

  def welcome(user_id)
    @user = User.find(user_id)

    mail to: @user.email, subject: 'Bem-vindo ao Espresso! Aqui estão suas credenciais de acesso'
  end
end
