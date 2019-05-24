package <%= package %>.model.event;

public interface DomainEvent {
    String getAggregateId();
    String getAggregateType();
}
