# frozen_string_literal: true

class StatementsFindService
  attr_reader :statement

  def initialize(id, current_user)
    @current_user = current_user

    @statement = if @current_user.admin?
                   Statement.admin_query(@current_user.company_id)
                 else
                   Statement.employee_query(@current_user.id)
                 end

    @statement = @statement.where(id: id).first

    raise ActiveRecord::RecordNotFound if @statement.blank?
  end
end
