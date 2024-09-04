class StatementsUpdateService
  attr_reader :statement, :errors

  def initialize(statement, params)
    @statement = statement
    @params = params
  end

  def update
    Statement.transaction do
      begin
        @statement.assign_attributes(@params)
        @statement.status = 'verified' if @statement.file.attached? && @statement.category.present?

        @statement.save!
      rescue ActiveRecord::RecordInvalid
        @statement.valid?
      end
    end
  end
end
